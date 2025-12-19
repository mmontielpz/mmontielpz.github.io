---
title: "MLE from scratch #1 - Linear regression beyond the textbook"
date: 2025-12-01
tags: ["mle-from-scratch", "machine-learning", "linear-regression"]
draft: false
---

In the current AI landscape, classical machine learning models are often considered obsolete.

Large-scale deep learning and foundation models dominate most discussions, driven by abundant compute,
massive datasets, and rapidly evolving tooling. In many teams, reaching for a large model has become the
default response, sometimes before the problem itself is fully understood.

What is discussed far less is the cost of this default. Infrastructure expenses grow quickly, data requirements
escalate, and system complexity increases in ways that are difficult to reason about. In practice, many production
failures attributed to model limitations are symptoms of deeper issues, weak signals, noisy or poorly curated data,
and objectives that were never clearly defined.

This is where linear regression remains relevant. Not as a competitor to modern deep learning, but as a diagnostic tool.
Its simplicity forces assumptions to be made explicit and exposes whether a problem is constrained by data quality,
feature representation, or system design rather than model capacity.

In environments where latency budgets are tight, inference costs matter, or interpretability is required, linear regression often
provides a stable and predictable baseline. More importantly, when a simple model fails, it fails in ways that are easy to
inspect. Residuals, coefficient behavior, and error patterns usually reveal structural issues long before
larger models obscure them behind capacity and scale.

## Core idea

At its core, linear regression models the target as a linear function of the inputs. This simplicity is intentional. The model
assumes that the relationship between features and the output can be approximated as a weighted sum, making the behavior of the
system easier to reason about, inspect, and debug under real constraints.

The key assumption is linearity in the parameters, not necessarily linearity in the data generating process. This distinction is often
overlooked. By constraining how parameters interact, linear regression trades expressive power for stability, interpretability, and
predictable optimization behavior. In practice, this trade-off defines when the model is appropriate and when it will systematically
underfit, regardless of data volume.

Training linear regression typically means minimizing mean squared error. This choice is not neutral. Mean squared error penalizes large
deviations aggressively, making the model sensitive to outliers and noisy labels. Under common assumptions about the noise distribution,
this objective is mathematically convenient and well understood. In real systems, however, it also shapes how errors propagate, how
coefficients behave, and which data points dominate learning.

## From scratch

From first principles, linear regression reduces to a constrained optimization problem.
Given a fixed feature representation, learning consists of selecting parameters that
minimize an error objective over observed data. What makes this setup valuable is not
the optimization itself, but how explicitly it exposes the assumptions embedded in the
data, the loss, and the feature space.

```text
input data
   ↓
feature representation (x)
   ↓
linear combination (w · x + b)
   ↓
prediction (ŷ)
   ↓
error (ŷ − y)
```

In its simplest form, this problem can be solved either analytically or through iterative
optimization. Closed form solutions are mathematically elegant, but in practice, gradient
based methods are often preferred due to numerical stability and scalability. Importantly,
neither approach changes the underlying assumptions of the model. Optimization choice
affects efficiency, not expressiveness.

```text
initialize parameters w, b
repeat until convergence:
    y_hat = w · x + b
    compute mean squared error
    update w, b using gradients
```

This formulation is intentionally minimal. Beyond this point, additional complexity
does not come from the model itself, but from data decisions, feature construction,
and system constraints. Linear regression makes these boundaries explicit. Once
the mechanics are understood, the critical questions shift away from optimization
and toward how the model interacts with real data and real operating environments.

## System implications

In production systems, the behavior of linear regression is dominated by data and feature
choices rather than optimization details. Feature scaling, collinearity, and outliers have
an outsized impact on coefficient stability and error distribution. When features are poorly
defined or weakly related to the target, linear regression does not compensate with capacity.
It exposes the limitation immediately, often through unstable coefficients or uniformly high
residuals across segments.

Linear regression also highlights a class of failure modes that are easy to overlook.
Underfitting tends to look stable in dashboards, predictions change smoothly, and metrics
may degrade slowly. This makes evaluation beyond aggregate metrics essential. Residual
analysis, segment level performance, and monitoring feature drift become critical. When
these signals are ignored, systems continue to operate while delivering systematically
biased or uninformative outputs

## Takeaways

- Linear regression is not a replacement for modern deep learning, but a powerful diagnostic tool for understanding data, assumptions, and system constraints.
- Its simplicity exposes failure modes early, especially those related to weak signals, feature quality, and silent underfitting.
- In production settings, the value of linear regression comes less from optimization and more from how clearly it reveals data and system limitations.

## Repository 

A full mathematical derivation, reference implementation, and supporting experiments are available in the companion repository. The repository expands
on the concepts discussed here, including detailed notebooks, code examples, and analysis focused on practical machine learning engineering considerations.

→ <a href="https://github.com/mmontielpz/mle-fundamentals-lab/tree/main/modules/week_01_linear_regression" target="_blank" rel="noopener noreferrer">
https://github.com/mmontielpz/mle-fundamentals-lab/tree/main/modules/week_01_linear_regression
</a>
