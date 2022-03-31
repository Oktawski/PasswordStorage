using PasswordManager.Entities;
using PasswordManager.Requests;
using PasswordManager.Responses;

namespace PasswordManager.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest request);
        Task<RegisterResponse> Register(RegisterRequest request);
        User GetById(Guid id);
    }

    public class UserService : IUserService
    {
        private readonly PasswordManagerContext _repository;

        public UserService(PasswordManagerContext repository)
        {
            _repository = repository;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest request)
        {
            throw new NotImplementedException();
        }


        public async Task<RegisterResponse> Register(RegisterRequest request)
        {
            var username = request.username;

            if (IsUserExistingByUsername(username)) 
                return new RegisterResponse("User already exists", null);

            if (!IsPasswordConfirmed(request.password, request.passwordConfirm)) 
                return new RegisterResponse("Passwords do not match", null);

            var user = new User
            {
                Username = request.username,
                Password = BCrypt.Net.BCrypt.HashPassword(request.password)
            };

            _repository.Users.Add(user);
            await _repository.SaveChangesAsync();

            return new RegisterResponse("User created", user);
        }

        private bool IsUserExistingByUsername(string username)
        {
            var user = _repository.Users.FirstOrDefault(u => u.Username == username);
            return user != null;
        }

        private bool IsPasswordConfirmed(string password, string confirmPassword) =>
            password == confirmPassword;

        public User GetById(Guid id)
        {
            return new User
            {
                Username = "User"
            };
        }
    }
}