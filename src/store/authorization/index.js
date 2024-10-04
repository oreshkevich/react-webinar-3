import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      dataUserInfo: null,
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  async submitAuthorization(userData) {
    this.setState({
      dataUserInfo: {},
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
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState({
        dataUserInfo: json.result,
        waiting: false,
        error: '',
      });
      localStorage.setItem('token', json.result.token);
      window.location.assign('./profile');
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        error: error.message,
        waiting: false,
      });
    }
  }
  clearError() {
    this.setState({ error: '' });
  }
}

export default UserState;
