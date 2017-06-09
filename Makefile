release:
	git pull; npm i; make build;

run:
	rm -rf dist; NODE_ENV=development ./node_modules/.bin/babel-node server.babel.js

build:
	rm -rf dist; NODE_ENV=production ./node_modules/.bin/webpack --config ./webpack.config.prod.babel.js

prod_modules:
	NODE_ENV=production ./node_modules/.bin/webpack --config ./webpack.config.prod.babel.js --display-modules >> modules.txt

test_build:
	make build; rm -rf dist

lint:
	./node_modules/.bin/eslint --config='.eslintrc' --ext .jsx --ext .js .
	# eslint --config='.eslintrc' --ext .jsx --ext .js .

test:
	./node_modules/.bin/mocha --require ignore-styles test/.setup.js test/**/*.spec.js

wtest:
	./node_modules/.bin/mocha --require ignore-styles test/.setup.js test/**/*.spec.js --watch

reset_repo:
	rm -Rf .git
	git init
	git add .
	git commit -m'first commit'
	git remote add origin git@github.com:vaeum/react-redux-router4-webpack2.git
	git push -u -f origin --all

.PHONY: test
