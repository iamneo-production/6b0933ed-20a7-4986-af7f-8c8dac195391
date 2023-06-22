#!/bin/bash

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;

    # checking for login component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/auth/login" ]
    then
        cp /home/coder/project/workspace/karma/login.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/auth/login/login.component.spec.ts;
    else
        echo "FE_login FAILED";
    fi

    # checking for signup component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/auth/signup" ]
    then
        cp /home/coder/project/workspace/karma/signup.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/auth/signup/signup.component.spec.ts;
    else
        echo "FE_signup FAILED";
    fi

    # checking for admin homepage component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/admin/adminhomepage" ]
    then
        cp /home/coder/project/workspace/karma/adminhomepage.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/admin/adminhomepage/adminhomepage.component.spec.ts;
    else
        echo "FE_adminHomepage FAILED";
    fi

    # checking for admin review component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/admin/adminreview" ]
    then
        cp /home/coder/project/workspace/karma/adminreview.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/admin/adminreview/adminreview.component.spec.ts;
    else
        echo "FE_adminReview FAILED";
    fi

    # checking for customer addjob component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customer/customeraddjob" ]
    then
        cp /home/coder/project/workspace/karma/customeraddjob.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customer/customeraddjob/customeraddjob.component.spec.ts;
    else
        echo "FE_customerAddJob FAILED";
    fi

    # checking for customer appliedjob component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customer/customerappliedjob" ]
    then
        cp /home/coder/project/workspace/karma/customerappliedjob.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customer/customerappliedjob/customerappliedjob.component.spec.ts;
    else
        echo "FE_customerAppliedJob  FAILED";
    fi

    # checking for customer homepage component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customer/customerhomepage" ]
    then
        cp /home/coder/project/workspace/karma/customerhomepage.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customer/customerhomepage/customerhomepage.component.spec.ts;
    else
        echo "FE_customerHomepage FAILED";
    fi

    # checking for customer review component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/customer/customerreview" ]
    then
        cp /home/coder/project/workspace/karma/customerreview.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/customer/customerreview/customerreview.component.spec.ts;
    else
        echo "FE_customerReview FAILED";
    fi

    # checking for jobseeker joblist component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerjoblist" ]
    then
        cp /home/coder/project/workspace/karma/jobseekerjoblist.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerjoblist/jobseekerjoblist.component.spec.ts;
    else
        echo "FE_jobseekerJobList FAILED";
    fi

    # checking for jobseeker appliedjob component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerappliedjob" ]
    then
        cp /home/coder/project/workspace/karma/jobseekerappliedjob.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerappliedjob/jobseekerappliedjob.component.spec.ts;
    else
        echo "FE_jobseekerAppliedJob FAILED";
    fi

    # checking for jobseeker review component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerreview" ]
    then
        cp /home/coder/project/workspace/karma/jobseekerreview.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/jobseeker/jobseekerreview/jobseekerreview.component.spec.ts;
    else
        echo "FE_jobseekerReview FAILED";
    fi

    cd /home/coder/project/workspace/angularapp/;
    npm test;
else   
    echo "FE_login FAILED";
    echo "FE_signup FAILED";
    echo "FE_adminHomepage FAILED";
    echo "FE_adminReview FAILED";
    echo "FE_customerAddJob FAILED";
    echo "FE_customerAppliedJob  FAILED";
    echo "FE_customerHomepage FAILED";
    echo "FE_customerReview FAILED";
    echo "FE_jobseekerJobList FAILED";
    echo "FE_jobseekerAppliedJob FAILED";
    echo "FE_jobseekerReview FAILED";
fi