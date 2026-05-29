const path = require('path');

console.log('🧪 Starting DevPulse AI Backend syntax & dependency verification test...');

try {
  // Mock ENV variables so the self-validating configuration doesn't block loading
  process.env.PORT = '5000';
  process.env.MONGO_URI = 'mongodb://localhost:27017/devpulse';
  process.env.JWT_SECRET = 'super_secret_jwt_key_test_123456';
  process.env.JWT_EXPIRE = '7d';
  process.env.OPENAI_API_KEY = 'mock_openai_key';
  process.env.GITHUB_API_KEY = 'mock_github_key';
  process.env.NODE_ENV = 'test';

  console.log('✅ Mock environments configured.');

  const BASE_DIR = 'c:/Users/HP/OneDrive/Pictures/Documents/Desktop/devtracker/backend/src';

  // 1. Load Configurations
  console.log('🔄 Checking configuration loaders...');
  const env = require(path.join(BASE_DIR, 'config/env'));
  const jwt = require(path.join(BASE_DIR, 'config/jwt'));
  const db = require(path.join(BASE_DIR, 'config/db'));
  console.log('✅ Configurations loaded successfully.');

  // 2. Load Utils
  console.log('🔄 Checking utilities...');
  const apiResponse = require(path.join(BASE_DIR, 'utils/apiResponse'));
  const hashPassword = require(path.join(BASE_DIR, 'utils/hashPassword'));
  const comparePassword = require(path.join(BASE_DIR, 'utils/comparePassword'));
  const generateToken = require(path.join(BASE_DIR, 'utils/generateToken'));
  console.log('✅ Utilities loaded successfully.');

  // 3. Load Models
  console.log('🔄 Checking Mongoose models...');
  const User = require(path.join(BASE_DIR, 'models/user.model'));
  const Skill = require(path.join(BASE_DIR, 'models/skill.model'));
  const Resume = require(path.join(BASE_DIR, 'models/resume.model'));
  const Tracker = require(path.join(BASE_DIR, 'models/tracker.model'));
  const Contest = require(path.join(BASE_DIR, 'models/contest.model'));
  console.log('✅ Models parsed successfully.');

  // 4. Load Services
  console.log('🔄 Checking core services...');
  const openaiService = require(path.join(BASE_DIR, 'services/openai.service'));
  const githubService = require(path.join(BASE_DIR, 'services/github.service'));
  const contestService = require(path.join(BASE_DIR, 'services/contest.service'));
  const resumeService = require(path.join(BASE_DIR, 'services/resume.service'));
  console.log('✅ Services loaded successfully.');

  // 5. Load App
  console.log('🔄 Booting modular Express application instance...');
  const app = require(path.join(BASE_DIR, 'app'));
  console.log('✅ Express app instance created successfully with all routes mounted.');

  console.log('\n🎉 SUCCESS! All files, routers, validators, controllers, models, and service interfaces have loaded cleanly with 0 errors.');
  process.exit(0);
} catch (error) {
  console.error('\n❌ VERIFICATION FAILURE! Detected load error:');
  console.error(error.message);
  console.error(error.stack);
  process.exit(1);
}
