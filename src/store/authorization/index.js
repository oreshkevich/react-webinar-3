import StoreModule from '../module';

class AuthorizationState extends StoreModule {
  initState() {
    return {
      data: {},
      getData: {},
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  async submitAuthorization(userData) {
    this.setState({
      data: {},
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error.message);
      }

      this.setState({
        data: json.result,
        waiting: false,
      });
      localStorage.setItem('token', json.result.token);
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        error: error.message,
        waiting: false,
      });
    }
  }

  exitAuthorization() {
    this.setState({
      data: {},
    });
    localStorage.setItem('token', '');
  }
}

export default AuthorizationState;
