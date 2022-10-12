import { PlaywrightTestConfig,devices } from "@playwright/test";
import dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.', 'credentials.env') });


const config: PlaywrightTestConfig = {
    
    use:{
        headless: false,
    },
    
    projects: [
        // {
        //     name:'firefox',
        //     use: {...devices['Desktop Firefox']},    
        // },
        {
            name:'chromium',
            use: {...devices['Desktop Chrome']},    
        },
        
     ]
     
        };
export default config;