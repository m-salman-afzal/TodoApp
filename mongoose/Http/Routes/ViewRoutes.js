import express from 'express';
import * as viewController from '../Controllers/ViewController.js';

const router = express.Router();

router.route('/').get(viewController.getBase);

export { router };
