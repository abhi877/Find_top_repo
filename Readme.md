Name: Abhinav
email: kumar.abhinav5670@gmail.com
Number: +91-6283445670

Technology Used: 
----------------
HTML, CSS, JavaScript, JQuery

About: 
------
In a summarized way, this project is used to find the top repository files of any orgranisation.
It takes 3 inputs: Organisation Name, How many top repos of the organisation the user want to search, and how many top contributors of that each repo the user want to see.
Everything is shown in a readable format with all the links and avatars embedded. The first loading might take 5-10 sec as I am using free version of API and dont have a fast server but i've taken care that the site never crash and give the output as quick as possible. For making calls less and fast i have used pagination technique. Ajax calls are used so that page dosent have to reload again and again which makes it scalable and ready for production.

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

    
My Role: 
--------
This project is a minor project and is being created by myself. The whole program is divided into multiple modules (functions) and I used modular programming to make the code more efficient. I also used some advanced concepts of Java language and some APIs github (links are given above).

Difficulties:
-------------
I faced some difficulties to use some free versions of API because the project was taking too much time to laod the repositories of a particular organization. It was not a fast server. I also find the implementation of pagination technique and AJAX because of the heavy versions. So the browser was taking some time to load the repos. But I took care of it to minimize the complexity of pagination technique by using shadow index.
