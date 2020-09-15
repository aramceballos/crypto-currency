class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      const response = await fetch(url);

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('http get method error', error);

      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('http post method error', error);

      throw Error(error);
    }
  };

  put = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('http post method error', error);

      throw Error(error);
    }
  };

  delete = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        body,
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('http post method error', error);

      throw Error(error);
    }
  };
}

export default Http;
