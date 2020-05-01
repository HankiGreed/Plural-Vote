pragma solidity ^0.6.0;

contract Vote {

    uint [] public votes = [0,0,0,0,0];
    string [] public options = [ "Coffee","Tea","Beer","Whisky","Mocktail" ];
    mapping (address => bool) hasVoted; 
    string optionString = "Coffee , Tea, Beer, Whisky, Mocktail";
    function getOptions() public view returns (string memory){

        return optionString;
    } 

    function vote (uint option) public {
        require(!hasVoted[msg.sender],"Already Voted !"); 
        require(option<5,"Invalid Option !"); 

        hasVoted[msg.sender] = true;
        votes[option] ++;
    }
    function getVotes() public view returns (uint [] memory) {
        return votes;
    }
}
