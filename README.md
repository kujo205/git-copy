> [!IMPORTANT]
> This is highly experimantal, bugs are expected


# gitcopy
🛠️ A utility command to copy any folders or files of any public github/gitlab/bitbucket repo to selected path, without copying the whole repo

# Road map

## Features
- [x] Add a command to copy files or folder from remote gh repo to local repo
- [ ] Add a command to see history of copying files, by integrating with sqlite 
- [x] Support for github
- [ ] Support for gitlab
- [ ] Support for bitbucket
- [x] Support for Linux/Unix/Macos
- [x] Support for Windows

## Installation

You must have npm installed in order to install this script.


### Basic installation

```bash
npm install -g git-remote-copy
```


And use it like 
```bash
git-remote-copy https://github.com/kujo205/kujo205/blob/main/README.md .
```
<img width="742" alt="image" src="https://github.com/user-attachments/assets/f19be6b5-eb49-481d-b86d-db3c92fe1b53" />

or you can also add it as git alias, which looks cooler.


### Adding command as git alias

Then enter your global git config file by running 
```bash
 git config --global --edit
```

Modify this file in the editor of your choice (I use vim, please check some guide if you struuggle with this). And add the line
```bash
  copy = "!git-remote-copy"
```
to alias area
<img width="576" alt="image" src="https://github.com/user-attachments/assets/1cfee850-c537-4ff6-ad21-8399d352015b" />

After this you can use this command as if it is default git command
<img width="965" alt="image" src="https://github.com/user-attachments/assets/da3c3124-9537-4ac7-8b9d-8f4f72214301" />



# Side quest
- Implement as many pattern as possible, you can find info about patterns an examples of their implementation in PATTERNS.md
