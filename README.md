# Klok 2 Entelect Time sheets (K2ET)

> Transforms Klok2's time sheet format to the Entelect's one for importing.

[Klok](http://www.getklok.com/) is a great tool for tracking your time sheets with. It is available in both a free and paid-for version. However neither option outputs data in a format that the Entelect time sheet system can handle and manually copying over your comments and times can be tedious and error prone.

Enter Klok 2 Entelect Time sheets (K2ET)!

# Table of Contents
- [Features](#features)
- [Coming soon](#coming-soon)
- [Setup](#setup)
- [Exporting and Importing](#exporting-and-importing)
- [Potential Ideas/Enhancements](#potential-ideasenhancements)

# Features
1. Simply drag the project-category you are working on to the working area, or double click it, a timer starts.
1. If you want to switch projects/categories, double click or drag that.
1. Before you take a break or go home, hit the stop button.
1. Once a day/week/month export your time sheet data from Klok and into Entelect's time sheet system.
1. Capture comments at any time to the block you are working on.

![](http://getklok.com/images/klok2/big/weekViewEdit.gif)

# Coming Soon
1. Support for sentiment field by parsing the comment for any of the 3 smilies/emojis - :) :| :(
1. Support the ticket field by parsing the comment for a # symbol?
1. Klok marks a whole project as billable or non-billable, so would need to use the comment field. Maybe @billable?

# Setup

1. Download and install [Node.js 6.x or above](https://nodejs.org/en/)
1. [Download or Clone K2ET](https://github.com/eXigentCoder/klok-2-entelect-timesheets) to your computer.
1. Open the K2ET folder in a terminal/command prompt and type `npm install`
1. Download your preferred version of Klok from the [versions](http://www.getklok.com/features.html#versions) page.
1. Download your personalised time sheet template from the Entelect time sheet system. It will have the correct spelling of your personalised projects and category list.
1. Add some of the projects and categories that you frequently use, this should be in a 2 level project-category like you can see here:
![project-category-setup](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/project-category-setup.png)
1. Configure your Klok options as follows:
![example-config](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/example-config.png)
1. Capture your time by either double clicking on the `categry` or draggaing it to the `Drop here to work on` box.

> **Do not** capture time against the project node directly or you will be sad :(

For tips and tricks to using Klok, check out the [features page](http://www.getklok.com/features.html)

# Exporting and Importing
1. Choose the date range to export data for in the app. For the least admin, do this every week, however note that you can choose a custom date range. This comes in handy when the end of the month is in the middle of the week.
![export-01](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-01.png)
1. Save the file into your `resources` folder, it will be a `.xls` file.
![export-02](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-02.png)
![export-03](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-03.png)
1. Open the file in excel, you will get a warning, click `yes`.
![export-04](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-04.png)
1. Select `File` -> `Save As`, enter the name and file extension as below
![export-05](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-05.png)
1. Open the K2ET folder in a terminal/command prompt and type `node .`
![export-06](https://raw.githubusercontent.com/eXigentCoder/klok-2-entelect-timesheets/master/resources/images/export-06.png)
1. Upload the file to the Entelect time sheet system using Chrome, FireFox does not seem to be supported. Verify and save the results.

# Potential Ideas/Enhancements
1. Use something like [git-release-notes](https://www.npmjs.com/package/git-release-notes) to pull in comment data, based on some pre-defined format
1. Host this as a service
1. Create and distribute an electron app.
1. Find a way to sync the projects & categories across from Entelect to Klok, maybe using [Klokwork Team Console](http://getklok.com/KlokworkTeamConsole.html)
1. If two comments for the same project-category for the same day, will it only take one? concat!
1. Ignore certain projects(Config list?) or entries (Comment?)