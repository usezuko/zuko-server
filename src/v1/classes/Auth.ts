import jwt from 'jsonwebtoken';

class Auth {
  id?: number;

  constructor(auth?: { id: number }) {
    this.set(auth);
  }

  set(auth?: { id: number }) {
    if (auth !== undefined) {
      this.id = auth.id;
    }
  }

  async authenticateUser(publicAddress: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Your authentication logic here
    });
  }
}

export default Auth;
