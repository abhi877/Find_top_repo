// github token for more api calls
const token = 'd5ad006c2f785cd9d36869ee8d7ba6149181a7e4'
    ///////////////////////// execute after loading basic html/////////////////////////////////////////////////////////////
$(() => {
        $('#load').hide()
        $('#error').hide()
        $('#btn').click(() => {
            $('#error').hide()
            const org_name = $('#org-name').val()
            const repo_input = $('#repo-input').val()
            const contributor_input = $('#contributor-input').val()
            if (repo_input <= 0 || contributor_input <= 0) {
                $('#list').empty()
                $('#error').show()
                $('#pager').hide()
                return
            }
            $('#load').show()
            $('#pager').empty()
            $('#list').empty()
                ///////////////////////////////////////////////call for the number of repos of an org//////////////////////////////////////
            $.get(`https://api.github.com/orgs/${org_name}`, (data, status) => {
                if (status != "success") {
                    $('#error').show()
                    $('#lpad').hide()
                    throw new Error('Something wrong') ////error handling
                }

                const repo_count = parseInt(data.public_repos)
                let pages = repo_count
                const repos = []

                if (repo_count % 100 == 0) {
                    pages = parseInt(repo_count / 100)
                } else {
                    pages = parseInt(repo_count / 100) + 1
                }

                let promiseArray = [] //promises of all the pages of the repos of that org
                for (let index = 0; index < pages; index++) {
                    promiseArray.push(getPageData(`https://api.github.com/orgs/${org_name}/repos?per_page=100&page=${index+1}`)) //call for all the repos
                }
                //////////////////////////////////////////////////////////////after all the promises get resolved/////////////////////////////////////////////////////////
                Promise.all(promiseArray).then((data) => {
                    data.forEach((page) => {
                        page.forEach((repo) => {
                            repos.push(repo)
                        })
                    })

                    repos.sort(function(a, b) { //sorting in descending order of forks_count
                        return b.forks - a.forks
                    })

                    const repoArray = repos.slice(0, repo_input)
                    getCurrentPageData(repoArray, 1, 10, org_name, contributor_input)
                    showPager(repoArray.length, 10, repoArray, org_name, contributor_input) //for pagination things
                })

            }).fail(() => { //error handling
                $('#load').hide()
                $('#list').hide()
                $('#pager').hide()
                $('#error').text("something is wrong with the server").show()
            })

        })
    })
    /////////////////////////////////////////////////////////call for single page of repos////////////////////////////////////////////////////
const getPageData = async(url) => {
        return new Promise((resolve, reject) => {
            $.get(url, (data, status) => {
                if (status != "success") {
                    reject(new Error('Something Wrong'))
                }

                const arr = []
                data.forEach(repo => {
                    arr.push({
                        name: repo.name,
                        forks: repo.forks,
                        url: repo.html_url
                    })
                })
                resolve(arr)
            })
        })
    }
    ///////////////////////////////////////////////////////call for contributors of a particular repo/////////////////////////////////////////
const getContributorData = async(url) => {
        // console.log(url)
        return new Promise((resolve, reject) => {
            $.ajaxSetup({
                headers: {
                    'Authorization': "token " + token
                }
            })
            $.get(url, (data, status) => {
                if (status != "success") {

                    reject(new Error('Something Wrong'))
                }

                // console.log(data)
                const arr = []
                if (Array.isArray(data)) {
                    data.forEach((contributor) => {
                        arr.push({
                            name: contributor.author.login,
                            commits: contributor.total,
                            url: contributor.author.html_url,
                            avatar: contributor.author.avatar_url
                        })
                    })
                } else {
                    arr.push({})
                }
                resolve(arr)

            })
        })
    }
    //////////////////////////////////////////////////////buttons with links for pagination///////////////////////////////////////////////////
const showPager = (repo_input, page_size, repoArray, org_name, contributor_input) => {
        $('#pager').empty()
        let pages = repo_input
        if (repo_input % page_size == 0) {
            pages = parseInt(repo_input / page_size)
        } else {
            pages = parseInt(repo_input / page_size) + 1
        }
        for (let i = 1; i <= pages; i++) {
            $('#pager').append(
                $('<button>').text(i).click(() => {
                    getCurrentPageData(repoArray, i, page_size, org_name, contributor_input)
                })

            ).append(`&emsp;`)
        }

    }
    //////////////////////////////////////////////////////showing results with desired frontend/////////////////////////////////////////////////////////
const showList = (final, start) => {

        const output = []
        let index = start + 1
        for (let i = 0; i < final.length; i++) {
            const contributersFinal = []
            contributersFinal.push(`<ol>`)
            for (let j = 0; j < final[i].contributors.length; j++) {
                contributersFinal.push(`<li><img src="${final[i].contributors[j].avatar}" style="width:40px; height:40px">&emsp;<b>Contributer name:</b><a target="_blank" href="${final[i].contributors[j].url}"> ${final[i].contributors[j].name}</a>        
            &emsp; <b>Commits:</b> ${final[i].contributors[j].commits}</li>`)
            }
            contributersFinal.push(`</ol>`)
            output.push(
                `<li>
            <b>${index}&emsp;Repo-name:</b> <a target="_blank" href="${final[i].details.url}">${final[i].details.name}</a>&emsp;  <b>Total-Forks:</b> ${final[i].details.forks} <br>
            <b><i>top contributers are</i></b><br> <br>
            ${contributersFinal}
            </li><hr style="border-color:grey">`
            )
            index++
        }

        $('#load').hide()
        $('#list').append(output)
    }
    ///////////////////////////////////////////////////////////////call for single page of pagination/////////////////////////////////////////////
const getCurrentPageData = (repoArray, pageNumber, pageSize, org_name, contributor_input) => {

    $('#list').empty()
    $('#load').show()
        // console.log(repoArray)
    const start = (pageNumber - 1) * pageSize
    const end = (pageNumber) * pageSize
        // console.log(pageNumber, start, end)

    let newPromiseArray = []

    for (let index = start; index < repoArray.length && index < end; index++) {
        //async call for contributors of repos
        newPromiseArray.push(getContributorData(`https://api.github.com/repos/${org_name}/${repoArray[index].name}/stats/contributors`))
    }
    /////////////////////////////////////after all the contributors of the repos are received/////////////////////////////////////////
    Promise.all(newPromiseArray).then((data) => {

        let final = []
        let i = start
        data.forEach((arr) => {
                arr.reverse()
                final.push({
                    contributors: arr.slice(0, contributor_input),
                    details: repoArray[i]
                })
                i++
            })
            // console.log(final)
        showList(final, start)
    })
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxTHE PROJECT ENDS HERE TATAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx THANK-YOU xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//