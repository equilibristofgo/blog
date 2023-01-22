---
title: "Cadence"
date: 2023-02-28T19:00:00+02:00
draft: true
---

# Temas a tratar en la sesión de cadence

## Logs en cadence 
https://stackoverflow.com/questions/61311161/what-s-the-best-way-to-log-messages-from-cadence-workflows-and-activities

propio logger (zap no tienes "context"...)
- https://github.com/uber-go/zap/issues/654

## opciones de context (cadence) en activity

## A nivel de test... considerar poder pasar

service, err := c.h.Builder.BuildCadenceClient()
return client.NewClient(
        service,
        b.domain,
        &client.Options{
            Identity:           b.clientIdentity,
            MetricsScope:       b.metricsScope,
            DataConverter:      b.dataConverter,
            ContextPropagators: b.ctxProps,
            Tracer:             b.tracer,
            FeatureFlags: client.FeatureFlags{
                WorkflowExecutionAlreadyCompletedErrorEnabled: true,
            },
        }), nil        
wr, err := service.ExecuteWorkflow(ctx, options, workflow, args...)      