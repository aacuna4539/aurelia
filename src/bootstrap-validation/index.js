/**
 * Created by rigel on 8/22/16.
 */
import {BootstrapFormValidationRenderer} from './bootstrap-form-validation-renderer';

export function configure(config) {
    config.container.registerHandler(
        'bootstrap-form',
        container => container.get(BootstrapFormValidationRenderer));
}
