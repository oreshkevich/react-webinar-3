import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      getData: {},
      deleteData: null,
      error: '',
      waiting: false, // признак ожидания загрузки
    };
  }

  async verifyToken(token) {
    this.setState({
      getData: {},
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      this.setState({
        getData: json.result,
        waiting: false,
      });
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        error: error.message,
        waiting: false,
      });
      console.error(error.message);
    }
  }
  async clearUserInfo() {
    this.setState({
      getData: {},
      waiting: true,
    });
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      this.setState({
        ...this.getState(),
        deleteData: json.result,
        waiting: false,
      });
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
    }
    localStorage.setItem('token', '');
  }
}

export default UserState;
