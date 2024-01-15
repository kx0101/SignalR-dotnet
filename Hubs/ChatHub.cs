using Microsoft.AspNetCore.SignalR;

namespace signalrtest
{
    public class ChatHub : Hub
    {
        private readonly SharedDb _shared;

        private readonly ILogger<ChatHub> _logger;

        public ChatHub(SharedDb shared)
        {
            _shared = shared;
            _logger = new Logger<ChatHub>(new LoggerFactory());
        }

        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("ReceiveMessage", $"{connection.Username} has joined!");
        }

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

                _shared.connections[Context.ConnectionId] = connection;

                await Clients.Group(connection.ChatRoom)
                             .SendAsync("JoinSpecificChatRoom", $"{connection.Username} has joined {connection.ChatRoom}!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in JoinSpecificChatRoom");
                throw;
            }
        }

        public async Task SendMessage(string message)
        {
            if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Group(connection.ChatRoom)
                             .SendAsync("ReceiveSpecificMessage", connection.Username, message);
            }
        }
    }
}
