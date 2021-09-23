# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=14
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

# Install MongoDB command line tools
ARG MONGO_TOOLS_VERSION=4.2
RUN curl -sSL "https://www.mongodb.org/static/pgp/server-${MONGO_TOOLS_VERSION}.asc" | (OUT=$(apt-key add - 2>&1) || echo $OUT) \
  && echo "deb http://repo.mongodb.org/apt/debian $(lsb_release -cs)/mongodb-org/${MONGO_TOOLS_VERSION} main" | tee /etc/apt/sources.list.d/mongodb-org-${MONGO_TOOLS_VERSION}.list \
  && apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y \
  mongodb-org-tools \
  mongodb-org-shell \
  locales \
  zsh \
  wget \
  # set up locale
  && apt-get clean -y && rm -rf /var/lib/apt/lists/* \
  && locale-gen en_US.UTF-8

# Update args in docker-compose.yaml to set the UID/GID of the "node" user.
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then groupmod --gid $USER_GID node && usermod --uid $USER_UID --gid $USER_GID node; fi

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"

USER node

ENV TERM xterm
# Set the default shell to zsh rather than sh
ENV SHELL /bin/zsh
# run the installation script
RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh || true \
  && git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting \
  && git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions \
  && echo 'ZSH_THEME="robbyrussell"' >>~/.zshrc \
  && echo 'source ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >>~/.zshrc \
  && echo 'source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh' >>~/.zshrc \
