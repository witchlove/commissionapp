import { CommissionAppPage } from './app.po';

describe('commission-app App', function() {
  let page: CommissionAppPage;

  beforeEach(() => {
    page = new CommissionAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
