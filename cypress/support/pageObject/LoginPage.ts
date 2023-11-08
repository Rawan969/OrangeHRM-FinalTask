class loginPage {
  elements = {
    userName: () => cy.get('[placeholder="Username"]'),
    password: () => cy.get('[placeholder="Password"]'),
    loginBtn: () => cy.get("button"),
  };

  assertianElem = [
    {
      msg: "Dashboard",
      elem: () => cy.get(".oxd-topbar-header-breadcrumb"),
    },
    {
      msg: "Required",
      elem: () => cy.get(".oxd-input-field-error-message"),
    },
    {
      msg: "Invalid credentials",
      elem: () => cy.get(".oxd-text oxd-text--p oxd-alert-content-text"),
    },
  ];
  userLogin(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
    // cy.get('.oxd-topbar-header-breadcrumb-module').should('contain','Dashboard');
  }

  verfiyElem(message: string) {
    this.assertianElem.find(({ msg }) => msg === message)?.elem;
  }
}
export default loginPage;
