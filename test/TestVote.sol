pragma solidity ^0.6.0;

import "../contracts/Vote.sol";
import "truffle/Assert.sol";


contract TestVote {
    function testInit() public {
    Vote vote = new Vote(); 
    uint[] memory votes = vote.getVotes();
    uint[] memory expected = new uint[](5);
    expected[0] = 0;
    expected[1] = 0;
    expected[2] = 0;
    expected[3] = 0;
    expected[4] = 0;
    Assert.equal(votes,expected,"Votes must be zeros");
    }
}
