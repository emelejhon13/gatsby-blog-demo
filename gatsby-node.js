// gatsby-node.js

....
const {GitalkPluginHelper} = require('gatsby-plugin-gitalk');
const gitalkOpts = {...}
....
exports.createPages = async ({ graphql, actions, getNode, reporter }) => {

  // this token (GITALK_CREATE_ISSUE_TOKEN) apply from https://github.com/settings/tokens/new
  // which must have create new issue permission,
  // and for security issue, dont push public
  const gitalkCreateIssueToken = process.env.GITALK_CREATE_ISSUE_TOKEN
  // Due to github api request limit, it is recommended to  create issue for recently added articles
  // select articles from table order by createdate desc limit 10
  if (gitalkOpts && gitalkCreateIssueToken) {
    for (let i=0; i< articles.length; i++) {
      const article = articles[i];
      const issueOptions = Object.assign({}, gitalkOpts, {
        id: '{article.id}',
        title: '{article.title}',
        description: '{article.description}',
        url: '{article.url}',
      }, {
        personalToken: gitalkCreateIssueToken
      })
      // this function will try create new issue when it doesnt exist;
      await GitalkPluginHelper.createIssue(issueOptions)
      reporter.info(`create issue success`)
    }
  }
