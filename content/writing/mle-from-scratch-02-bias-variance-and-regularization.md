---
title: "MLE from scratch #2 – Bias, variance, and why training accuracy lies"
date: 2025-12-27
tags: ["mle-from-scratch", "machine-learning", "bias-variance", "regularization"]
draft: false
---

After building a baseline model, the next failure many teams encounter is not low accuracy,
but false confidence.

Training metrics look strong. Loss decreases smoothly. Models appear stable.
Yet performance degrades in production, generalization fails, and iteration becomes reactive.
In many cases, the issue is not the algorithm itself, but a misunderstanding of how model
complexity, data, and evaluation interact.

This is where the bias–variance framework becomes essential. Not as a theoretical decomposition,
but as a practical lens for interpreting error behavior and deciding what kind of change is
actually justified.

## Core idea

At a high level, bias and variance describe two fundamentally different ways a model can fail.

Bias reflects systematic error. The model is too simple relative to the structure of the data.
No amount of additional data will fix this. The model is mis-specified.

Variance reflects sensitivity. The model reacts strongly to small changes in the training data.
Training performance may look excellent, but generalization is unstable and unpredictable.

Most real systems operate somewhere between these extremes. The challenge is not to eliminate
either bias or variance, but to understand which regime you are in before making changes.

Crucially, training error alone cannot answer this question. Low training error is compatible
with both a well-generalizing model and a severely overfit one.

## Making the trade-off observable

The bias–variance trade-off is often introduced mathematically, but in practice it is diagnosed
empirically.

By fixing the data-generating process and systematically varying model complexity, error behavior
becomes observable. Validation curves expose regimes where:

- training error is low but validation error is high (variance-dominated),
- both errors are high (bias-dominated),
- validation error stabilizes while training error increases moderately (controlled generalization).

This perspective reframes evaluation. Instead of asking “How good is this model?”, the more useful
question becomes “How does this model fail as constraints change?”

## Regularization as variance control

Regularization is often described as a technique to “improve generalization”.
This description is incomplete.

Regularization does not change what a model can represent. It does not correct a wrong model
class or missing structure. What it does is constrain parameter magnitude, reducing sensitivity
to noise and limiting variance.

In variance-dominated regimes, this trade-off is beneficial. Training error increases slightly,
but validation performance improves and becomes more stable. In bias-dominated regimes,
regularization cannot help. It simply constrains an already inadequate model.

Understanding this distinction is critical. Applying regularization blindly can hide structural
issues without fixing them, leading to systems that appear stable while remaining fundamentally
uninformative.

## Verification beyond notebooks

Visualizations are useful, but they are not sufficient.

To reason reliably about generalization, empirical observations must be reproducible under
controlled invariants. Fixing the data, the split, the feature representation, and the metric,
and then comparing regularized versus unregularized models makes the effect of variance control
explicit.

This kind of experiment serves a different purpose than hyperparameter tuning. It is not about
finding the best model, but about validating an explanation for observed behavior.

## System implications

From a system perspective, the bias–variance framework guides decisions that go far beyond model
selection.

If variance dominates, collecting more data or constraining the model may be justified.
If bias dominates, increasing complexity or changing features is required.
If neither improves validation behavior, the problem formulation itself may be flawed.

Regularization should therefore be treated as a diagnostic tool, not a default knob.
Its effectiveness depends entirely on whether the underlying model is structurally valid
for the problem at hand.

## Takeaways

- Training accuracy is not a measure of generalization.
- Bias and variance describe different failure modes that require different responses.
- Regularization controls variance but cannot fix model mis-specification.
- Reliable decisions require controlled experiments, not just metrics.

## Repository

The companion repository includes theory notes, diagnostic notebooks, and a reproducible
experiment comparing regularized and unregularized models under fixed conditions. Together,
these artifacts demonstrate how bias–variance reasoning translates into concrete engineering
decisions.

{{< extlink "https://github.com/mmontielpz/mle-fundamentals-lab/tree/main/modules/week_02_bias_variance" >}}
