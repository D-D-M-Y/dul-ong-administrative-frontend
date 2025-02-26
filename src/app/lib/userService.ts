export const userService = {
    authenticate,
  };
  
  function authenticate(email: string, password: string) {
    if(email !== "admin@example.com" && password !== "admin") { //(1)
      return null; //(2)
    }
  
    const user = { 
      id: "9001",
      name: "Web Admin", 
      email: "admin@example.com",
      username: "admin"}; //(3)
  
    return user; //(4) 
  }