Name: Aditya
email: aditya2041999@gmail.com
Number: 9896501004
Project-hosted-link: https://adityaalmabase.netlify.app/

Tech-stack: html, Css, JavaScript, JQuery

About: It takes 3 inputs (org_name),(how many top repos's of that org you want to see ) and (how many top contributors of that each repo you want to see).
everything is shown in a readable format with all the links and avatars embedded. The first loading might take 5-10 sec as i am using free version of Api and dont have a fast server but i've taken care that the site never crash and give the output as quick as possible. For making calls less and fast i have used pagination technique. Ajax calls are used so that page dosent have to reload again and again which makes it scalable and ready for production.

API used: 1> https://api.github.com/orgs/${org_name}
          2> https://api.github.com/orgs/${org_name}/repos?per_page=100&page=${page_no}
          3> https://api.github.com/repos/${org_name}/${repo_name}/stats/contributors

Special-features: 1> when requested repos are large in number then the site dosent crash as pagination concept is used.
                  2> All the calls are Async.
                  3> Site can handle any amount of data and ready to go for production.
                  4> Per page 10 async repo calls are made.
                  5> Avatar's and profile urls are displayed.
                  6> Ajax (XHR) requests are used so that the page dont reload.
                  7> Client side renderring is done.

For running it on your system: 1> download the code.
                               2> open it in vs code.
                               3> right click on index.html file.
                               4> Click on open with live server.
                               5> Make sure u have active internet connection.

    
My linkedIn profile and email link is also given on the home page :) 