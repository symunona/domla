import { DomlaCliPage } from './app.po';

describe('domla-cli App', () => {
  let page: DomlaCliPage;

  beforeEach(() => {
    page = new DomlaCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
