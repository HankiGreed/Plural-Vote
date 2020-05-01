const Vote = artifacts.require('Vote');

contract('Vote', (accounts) => {
  let firstAccount;
  beforeEach(async () => {
    firstAccount = accounts[0];
    vote = await Vote.new();
  });
  it('Should show all initial votes to be zero', async () => {
    let votes = await vote.getVotes.call();
    expect(toJSNumbers(votes)).to.deep.equal([0, 0, 0, 0, 0]);
  });

  it('Should vote properly', async () => {
    await vote.vote(0, {from: firstAccount});
    await vote.vote(1, {from: accounts[1]});
    await vote.vote(2, {from: accounts[2]});
    await vote.vote(3, {from: accounts[3]});
    await vote.vote(4, {from: accounts[4]});
    let votes = await vote.getVotes.call();
    expect(toJSNumbers(votes)).to.deep.equal([1, 1, 1, 1, 1]);
  });
  const ERROR_MSG =
    'Returned error: VM Exception while processing transaction: revert Already Voted ! -- Reason given: Already Voted !.';
  it('Shouldnt allow double voting', async () => {
    try {
      await vote.vote(2, {from: firstAccount});
      await vote.vote(2, {from: firstAccount});
      expect.fail();
    } catch (error) {
      expect(error.message).to.equal(ERROR_MSG);
    }
  });
  const ERROR_MSG2 =
    'Returned error: VM Exception while processing transaction: revert Invalid Option ! -- Reason given: Invalid Option !.';
  it('Shouldnt let voting to invalid option', async () => {
    try {
      await vote.vote(6, {from: firstAccount});
    } catch (error) {
      expect(error.message).to.equal(ERROR_MSG2);
    }
  });
});

const toJSNumbers = (votes) => {
  return votes.map((elem) => elem.toNumber());
};
