import exec from "k6/execution";

function envLogger (cloud_info, instance_info, scenario_info, test_info, vu_info){
    cloud_info = cloud_info || {}
    //All info except abort.
    if(cloud_info){
        console.debug(`
            // Cloud Environment variables
            -------------
            ${__ENV.LI_LOAD_ZONE}
            ${__ENV.LI_INSTANCE_ID}
            ${__ENV.LI_DISTRIBUTION}
        `)
    }
    instance_info = cloud_info || {}
    if(instance_info){
        console.debug(`
            Instance info
            -------------
            Vus active: ${exec.instance.vusActive}
            Iterations completed: ${exec.instance.iterationsCompleted}
            Iterations interrupted:  ${exec.instance.iterationsInterrupted}
            Iterations completed:  ${exec.instance.iterationsCompleted}
            Iterations active:  ${exec.instance.vusActive}
            Initialized vus:  ${exec.instance.vusInitialized}
            Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}
        `)
    }

    scenario_info = cloud_info || {}
    if(scenario_info){
        console.debug(`
            Scenario info
            -------------
            Name of the running scenario: ${exec.scenario.name}
            Executor type: ${exec.scenario.executor}
            Scenario start timestamp: ${exec.scenario.startTime}
            Percenatage complete: ${exec.scenario.progress}
            Iteration in instance: ${exec.scenario.iterationInInstance}
            Iteration in test: ${exec.scenario.iterationInTest}
        `)
    }

    test_info = cloud_info || {}
    if(test_info){
        console.debug(`
            Test info
            ---------
            All test options: ${JSON.stringify(exec.test.options)}
        `)
    }

    vu_info = cloud_info || {}
    if(vu_info){
        console.debug(`
            vu info
            -------
            Iteration id: ${exec.vu.iterationInInstance}
            Iteration in scenario: ${exec.vu.iterationInScenario}
            VU ID in instance: ${exec.vu.idInInstance}
            VU ID in test: ${exec.vu.idInTest}
            VU tags: ${JSON.stringify(exec.vu.tags)}      
        `);
    }
}

export { envLogger }