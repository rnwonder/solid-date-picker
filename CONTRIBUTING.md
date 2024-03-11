
# Welcome to Solid Date Picker docs contributing guide <!-- omit in toc -->

Thank you for investing your time in contributing to our project :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](solidjs/README.md). Here are some resources to help you get started with open source contributions:

- [Fork the library](https://github.com/rnwonder/solid-date-picker/fork)
- [Create an issue](https://github.com/rnwonder/solid-date-picker/issues)
- Solve the issue
- [Collaborating with pull requests](https://github.com/rnwonder/solid-date-picker/pulls)

### Themes
- When creating a new theme, we generally want the file to be in css format. That way anyone can use it without having to install any package like sass and the likes. Also please make sure it is responsive and accounts for dark mode too.
- Add a comment at the top of each theme, describing it. But more importantly add a version number, the supported date picker version and your github username. That way users can know if the theme has been updated by comparing the versions number and also know who to mention when raising an issue about a particular theme.
- Avoid the use of `!important` as much as you can.
- Refer to the styling props page on the [documentation](https://soliddatepicker.live/docs/styling/) for the available classes and data attributes.
- Also you can refer to an existing theme for how to get started. [Ark UI Theme](https://github.com/rnwonder/solid-date-picker/tree/main/src/themes/ark-ui) is certainly a good place to start.
- Have fun!

### Issues

#### Create a new issue

If you spot a problem with the date picker, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/rnwonder/solid-date-picker/issues/new).

#### Solve an issue

Scan through our [existing issues](https://github.com/rnwonder/solid-date-picker/issues) to find one that interests you. You can narrow down the search using `labels` as filters. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes

#### Make changes locally

1. Fork the repository.
- Using GitHub Desktop:
  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

2. Install or update to **Node.js**, at the version specified in `.node-version`. For more information, see [the development guide](contributing/development.md).

3. Create a working branch and start with your changes!

### Commit your update

Commit the changes once you are happy with them. Don't forget to self-review to speed up the review process:zap:.

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.
- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: And thank you :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [Solid Date Picker docs](https://soliddatepicker.live/docs/contributors/).

Now that you are part of the Solid Date Picker docs community!

