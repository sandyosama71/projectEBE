export const login = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        data.email === "admin@test.com" &&
        data.password === "123456"
      ) {
        resolve({
          token: "mock-jwt-token-123456",
          user: {
            name: "Admin",
            email: data.email,
          },
        });
      } else {
        reject({
          message: "Invalid email or password",
        });
      }
    }, 1000);
  });
};