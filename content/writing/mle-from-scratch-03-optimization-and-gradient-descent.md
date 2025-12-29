---
title: "MLE from scratch #3 – Optimization, Gradient Descent, and why convergence is not enough"
date: 2026-01-03
tags: ["mle-from-scratch", "machine-learning", "optimization", "gradient-descent"]
draft: false
---

Once a model is specified and its generalization behavior is understood, the next failure mode
appears at a different layer.

Models stop improving.
Training becomes unstable.
Iterations either explode or stall.
Teams react by changing learning rates, increasing epochs, or switching optimizers,
often without a clear diagnosis of what actually went wrong.

At this stage, the problem is no longer statistical.
It is operational.

Optimization is the mechanism that turns a model definition into a trained system.
Misunderstanding its behavior leads to fragile pipelines, wasted compute,
and convergence that is mistaken for correctness.

## Core idea

Gradient Descent is often treated as a black box:
a loop that eventually produces parameters if the learning rate is chosen “well enough”.

From an engineering perspective, this view is insufficient.

Optimization is a dynamical system operating over a loss surface.
Its behavior depends on geometry, step size, numerical stability, and termination rules.
Convergence alone does not guarantee that the process was controlled, safe, or even meaningful.

Understanding optimization therefore requires separating three questions:
- how parameters move over the loss surface,
- how and why this motion fails,
- and how the process is bounded in practice.

## Loss geometry and dynamics

Before discussing algorithms, it is necessary to understand what is being optimized.

Loss surfaces encode curvature, flat regions, and steep directions.
These properties determine how sensitive parameter updates are to step size
and why certain regions lead to slow progress or instability.

Visualizing the loss landscape makes one fact explicit:
Gradient Descent does not move toward an abstract “minimum”.
It follows local gradients shaped by geometry.
Poor conditioning alone can explain slow convergence or erratic updates,
even when the model itself is correct.

## Learning rate as a failure lever

Learning rate selection is often framed as a tuning problem.
In practice, it is a stability constraint.

If the learning rate is too small, optimization stagnates and progress becomes illusory.
If it is too large, updates overshoot, loss diverges, and numerical errors dominate.
Both regimes are failures, not just inefficiencies.

Importantly, these failures are not symmetric.
Divergence can produce misleading signals: loss curves that appear smooth before exploding,
or parameter values that silently overflow before triggering visible errors.

Understanding these behaviors is essential for diagnosing training failures
without resorting to optimizer swapping as a reflex.

## Stopping as an engineering decision

Even when optimization is stable, another question remains unanswered:
when should it stop?

Stopping criteria are often treated as minor implementation details.
In reality, they define the operational boundaries of training.

Maximum iteration limits, gradient norm thresholds, and loss improvement tolerances
each encode a different notion of sufficiency.
Under well-conditioned dynamics, these criteria may agree.
Under less ideal conditions, they can diverge significantly.

The key insight is that stopping rules do not exist to achieve mathematical optimality.
They exist to bound computation, control cost, and prevent uncontrolled behavior.

Convergence is not a stopping condition.
It is an observation.

## Verification beyond notebooks

As with previous modules, optimization behavior must be validated outside exploratory notebooks.

A reusable Gradient Descent implementation, paired with a script-level experiment,
allows comparison against a closed-form solution under fixed conditions.
This validates not only correctness, but also stability and termination behavior.

Such experiments are not about finding the fastest optimizer.
They are about establishing trust in the optimization process itself.

## System implications

From a system perspective, optimization failures propagate silently.

Unstable training leads to inconsistent artifacts.
Poor stopping rules waste resources or terminate prematurely.
Numerical instability can corrupt downstream evaluation without obvious alarms.

Treating optimization as an engineering subsystem,
with explicit dynamics, failure modes, and controls,
is necessary for building reliable machine learning systems.

Gradient Descent is simple.
Optimization is not.

## Takeaways

- Optimization is a dynamical system, not a parameter-fitting routine.
- Learning rate controls stability, not just speed.
- Divergence and stagnation are failure modes, not tuning inconveniences.
- Stopping criteria are operational controls, not afterthoughts.
- Reliable systems require explicit bounds on optimization behavior.

## Repository

The companion repository includes theory notes, diagnostic notebooks,
a reusable Gradient Descent implementation, and a validation experiment
comparing iterative optimization against the closed-form solution
under controlled conditions.

{{< extlink "https://github.com/mmontielpz/mle-fundamentals-lab/tree/main/modules/week_03_optimization" >}}
