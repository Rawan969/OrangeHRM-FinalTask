class loginPage {
  elements = {
    userName: () => cy.get('[placeholder="Username"]'),
    password: () => cy.get('[placeholder="Password"]'),
    loginBtn: () => cy.get("button"),
    logoutDropDown: () => cy.get(".oxd-userdropdown-tab"),
    logoutBtn: () => cy.contains("Logout"),
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
    cy.wait(5000);
  }

  verfiyElem(message: string) {
    this.assertianElem.find(({ msg }) => msg === message)?.elem;
  }
  logout() {
    this.elements.logoutDropDown().click();
    this.elements.logoutBtn().click();
    cy.wait(7000);
  }
}
export default loginPage;
