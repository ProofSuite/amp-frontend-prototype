
# Proof Crypto Fiat Prototype

This repository contains the prototype frontend for the Cryptodollar contracts and more generally the Proof AMP frontend

## Development and Testing Environment Setup

### Requirements:
- OSX or Linux (Windows setup is likely possible but not covered in this guide)
- Node (version 8.9.4 recommended)
- Solidity Compiler (version 0.4.18 or other)
- Ganache-cli (v6.0.3 or higher)


### Testing Environment Setup:

- Clone the repository and install dependencies

```
git clone https://github.com/ProofSuite/amp-frontend-prototype.git
cd amp-frontend-prototype
npm install
```

- If you are running a local chain, input the contract addresses in the config.js at the root of the repository

- Start the application

```
npm run start
```


## Contribution

Thank you for considering helping the Proof project !

To make the Proof project truely revolutionary, we need and accept contributions from anyone and are grateful even for the smallest fixes.

If you want to help Proof, please fork and setup the development environment of the appropriate repository.
In the case you want to submit substantial changes, please get in touch with our development team on our slack channel (slack.proofsuite.com) to
verify those modifications are in line with the general goal of the project and receive early feedback. Otherwise you are welcome to fix, commit and
send a pull request for the maintainers to review and merge into the main code base.

Please make sure your contributions adhere to our coding guidelines:

- Code must adhere as much as possible to standard conventions (DRY - Separation of concerns - Modular)
- Pull requests need to be based and opened against the master branch
- Commit messages should properly describe the code modified
- Ensure all tests are passing before submitting a pull request

## License

The Proof CryptoFiat smart contract (i.e. all code inside of the contracts and test directories) is licensed under the MIT License, also included in our repository in the
LICENSE file.




