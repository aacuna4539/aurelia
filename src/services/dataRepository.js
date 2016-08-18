/**
 * Created by rigel on 8/11/16.
 */
import { eventsData } from 'services/eventsData';
import { jobsData, states, jobTypes, jobSkills } from 'services/jobsData';
import moment from 'moment';

// find out wtf is going on here
import { BindingSignaler } from '../../jspm_packages/npm/aurelia-templating-resources@1.0.0/aurelia-templating-resources';

import { inject } from 'aurelia-framework';


function filterAndFormat(pastOrFuture, events) {
    var results = JSON.parse(JSON.stringify(events));
    if (pastOrFuture == 'past') {
        results = results.filter(item => moment(item.dateTime) < moment());
    }
    else if (pastOrFuture == 'future') {
        results = results.filter(item => moment(item.dateTime) > moment());
    }
    else {
        results = results;
    }

    return results;
}

@inject(BindingSignaler)
export class DataRepository {
    constructor(bindingSignaler) {
        setInterval(() => { bindingSignaler.signal('check-freshness');}, 1000);
    }

    getEvents(pastOrFuture) {
        var promise = new Promise((resolve, reject) => {
            if (!this.events) {
                setTimeout(() => {
                    this.events = eventsData.sort((a,b) =>
                        a.dateTime >= b.dateTime ? 1 : -1);
                    resolve(filterAndFormat(pastOrFuture, this.events));
                }, 10);
            }
            else {
                resolve(filterAndFormat(pastOrFuture, this.events));
            }
        });
        return promise;
    }


    getEvent(eventId) {
        return this.events.find(item => item.id == eventId);
    }

    addJob(job) {
        var promise = new Promise((resolve, reject) => {
            this.jobs.push(job)
            resolve(job);
        });
        return promise;
    }

    getJobs() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobs) {
                this.jobs = jobsData;
            }
            resolve(this.jobs);
        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve, reject) => {
            if (!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve, reject) => {
            if  (!this.jobTypes) {
                this.jobTypes = jobTypes;
            };
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve, reject) => {
            if (!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}