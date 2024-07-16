
describe('Identificando las entradas y capturar las dalidas de cada uno de los siguientes casos', () => {
    let username;
    let password;

    before(() => {
      username = `user_${Math.random().toString(36).substring(2, 15)}`;
      password = `pass_${Math.random().toString(36).substring(2, 15)}`;
    });

    it('Crear un nuevo usuario en signup', () => {
      cy.request('POST', 'https://api.demoblaze.com/signup', {
        username: username,
        password: password
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq('');
      });
    });

  it('Intentar crear un usuario ya existente', () => {
    cy.request('POST', 'https://api.demoblaze.com/signup', {
      username: username,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage');
      expect(response.body.errorMessage).to.eq('This user already exist.');
    });
  });

  it('Usuario y password correcto en login', () => {
    cy.request('POST', 'https://api.demoblaze.com/login', {
      username: username,
      password: password
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.a('string');
      expect(response.body).to.contain('Auth_token:');
      const token = response.body.split('Auth_token: ')[1];
      expect(token).to.exist;
      expect(token).to.have.length.greaterThan(0);
    });
  });

  it('Usuario y password incorrecto en login', () => {
    cy.request('POST', 'https://api.demoblaze.com/login', {
      username: "poolx",
      password: "Miclave.01x"
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('errorMessage');
      expect(response.body.errorMessage).to.eq('User does not exist.');
    });
  });

});
