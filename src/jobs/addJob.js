/**
 * Created by rigel on 8/14/16.
 */
import { inject, NewInstance } from 'aurelia-framework';
import { DataRepository } from 'services/dataRepository';
import { ValidationController, validateTrigger } from 'aurelia-validation';
import { required, ValidationRules } from 'aurelia-validatejs';

@inject(DataRepository, NewInstance.of(ValidationController), validateTrigger, ValidationRules)
export class AddJob {

    job = { jobType: 'Full Time', jobSkills: [], @required title: '', @required description: ''};

    constructor(dataRepository, validationController, /*validateTrigger, validationRules*/) {
        this.dataRepository = dataRepository;
        this.dataRepository.getStates().then(states => {
            this.states = states;
        });

        this.dataRepository.getJobTypes().then(jobTypes => {
            this.jobTypes = jobTypes;
        });

        this.dataRepository.getJobSkills().then(jobSkills => {
            this.jobSkills = jobSkills;
        });

        this.validationController = validationController;
        /*this.validationController.validateTrigger = validateTrigger.manual;*/

    }

    activate(params, routeConfig, navigationInstruction) {
        this.router = navigationInstruction.router;
    }

    save() {
        let errors = this.validationController.validate();

        if (errors.length === 0) {
            if (this.job.needDate) {
                this.job.needDate = new Date(this.job.needDate);
            }
            this.dataRepository.addJob(this.job).then(job => this.router.navigateToRoute('jobs'));
        }
    }
}
