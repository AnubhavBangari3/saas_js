console.log("Helo");
document.querySelector(".button-container").addEventListener("click", () => {
    let text = document.getElementById('job-filter').value;
    console.log(text, "I was clicked");
    getJobs().then(jobs => {
        let fileteredJobs = filterJobs(jobs, text);
        console.log(fileteredJobs);
        showJobs(fileteredJobs);
    })
});

function getJobs() {
    return fetch("data.json")
        //promise
        .then(response => response.json())

    .then(data => {
        console.log(data);
        return data;
    })
}

function filterJobs(jobs, searchText) {
    if (searchText) {
        let filteredJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) ||
                job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;

            } else {
                return false;
            }
        });
        return filteredJobs;
    } else {
        return jobs;
    }

}

function showJobs(jobs) {
    console.log(jobs);
    let jobContainer = document.querySelector('.job-container');
    console.log(jobContainer);

    let jobHTML = "";
    jobs.forEach(job => {
        console.log(job);
        jobHTML += `<div class="job-tile">

        <div class="top">
            <img src="${job.logo}">
        </div>
        <div class="rolename">
            <span>${job.roleName}</span>
        </div>
        <div class="description">
            <span>${job.requirements.content}</span>
        </div>
        <div class="buttons">
            <div class="button apply-now">Apply Now</div>
            <div class="button">Message</div>
        </div>
    </div>`;


    });
    jobContainer.innerHTML = jobHTML;
    console.log(jobHTML);
}
getJobs().then(data => {
    showJobs(data);
});