var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = Pathfinder","category":"page"},{"location":"#Pathfinder","page":"Home","title":"Pathfinder","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for Pathfinder.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [Pathfinder]","category":"page"},{"location":"#Pathfinder.WoodburyPDMat","page":"Home","title":"Pathfinder.WoodburyPDMat","text":"WoodburyPDMat(A::AbstractMatrix{T}, B::AbstractMatrix{T}, D::AbstractMatrix{T}) where {T<:Real}\n\nLazily represents symmetric matrices constructed from a low-rank update, that is\n\nW = A + B D B\n\nwhere A is a full rank positive definite matrix, D is a rank-k symmetric matrix, and B is a matrix of compatible size. Note that B and D must be chosen such that W is positive definite; this is only implicitly checked.\n\nOverloads for WoodburyPDMat make extensive use of the following decomposition. Let L_A L_A^mathrmT = A be the Cholesky decomposition of A, and let Q R = L_A^-1 B be a thin QR decomposition. Define C = I + RDR^mathrmT. Then, W = T T^mathrmT, where\n\nT = L_A Q beginpmatrix L_C  0  0  I endpmatrix\n\nFor a derivation of this decomposition for the special case of diagonal A, see appendix A of [Zhang2021].\n\n[Zhang2021] Lu Zhang, Bob Carpenter, Andrew Gelman, Aki Vehtari (2021).              Pathfinder: Parallel quasi-Newton variational inference.              arXiv: 2108.03782 [stat.ML]\n\n\n\n\n\n","category":"type"},{"location":"#Pathfinder.fit_mvnormal-Tuple{Any, Any}","page":"Home","title":"Pathfinder.fit_mvnormal","text":"fit_mvnormal(θs, ∇logpθs; cov_init=gilbert_initialization, history_length=5, ϵ=1e-12)\n\nFit a multivariate-normal distribution to each point on the trajectory θs.\n\nGiven θs with gradients ∇logpθs, construct LBFGS inverse Hessian approximations with the provided history_length. The inverse Hessians approximate a covariance. The covariances and corresponding means that define multivariate normal approximations per point are returned.\n\n\n\n\n\n","category":"method"},{"location":"#Pathfinder.lbfgs_inverse_hessian-Tuple{Any, Any, Any}","page":"Home","title":"Pathfinder.lbfgs_inverse_hessian","text":"lbfgs_inverse_hessian(α, S, Y)\n\nCompute approximate inverse Hessian initialized from α from history stored in S and Y.\n\nWith A = diag(α), the expression is\n\nbeginalign\nB = beginpmatrixAY  Sendpmatrix\nR = operatornametriu(S^mathrmT Y)\nE = I  R\nD = beginpmatrix\n    0  -R^-1\n    -R^-mathrmT  R^mathrm-T (E + Y^mathrmT A Y ) R^mathrm-1\nendpmatrix\nendalign\n\n\n\n\n\n","category":"method"},{"location":"#Pathfinder.multipathfinder-NTuple{4, Any}","page":"Home","title":"Pathfinder.multipathfinder","text":"multipathfinder(\n    logp,\n    ∇logp,\n    θ₀s::AbstractVector{AbstractVector{<:Real}},\n    ndraws::Int;\n    kwargs...\n)\n\nFilter samples from a mixture of multivariate normal distributions fit using pathfinder.\n\nFor n=length(θ₀s), n parallel runs of pathfinder produce n multivariate normal approximations of the posterior. These are combined to a mixture model with uniform weights. Draws from the components are then resampled with replacement. If filter=true, then Pareto smoothed importance resampling is used, so that the resulting draws better approximate draws from the target distribution.\n\nArguments\n\nlogp: a callable that computes the log-density of the target distribution.\n∇logp: a callable that computes the gradient of logp.\nθ₀s: vector of initial points from which each optimization will begin\nndraws: number of approximate draws to return\n\nKeywords\n\nndraws_per_run::Int=5: The number of draws to take for each component before resampling.\nimportance::Bool=true: Perform Pareto smoothed importance resampling of draws.\n\nReturns\n\ndist::Distributions.MixtureModel: Uniformly weighted mixture of ELBO-maximizing   multivariate normal distributions\nϕ::Vector{<:AbstractVector{<:Real}}: ndraws approxiate draws from target distribution\n\n\n\n\n\n","category":"method"},{"location":"#Pathfinder.pathfinder-NTuple{4, Any}","page":"Home","title":"Pathfinder.pathfinder","text":"pathfinder(logp, ∇logp, θ₀::AbstractVector{<:Real}, ndraws::Int; kwargs...)\n\nFind the best multivariate normal approximation encountered while optimizing logp.\n\nThe multivariate normal approximation returned is the one that maximizes the evidence lower bound (ELBO), or equivalently, minimizes the KL divergence between\n\nArguments\n\nlogp: a callable that computes the log-density of the target distribution.\n∇logp: a callable that computes the gradient of logp.\nθ₀: initial point from which to begin optimization\nndraws: number of approximate draws to return\n\nKeywords\n\nrng::Random.AbstractRNG: The random number generator to be used for drawing samples\noptimizer::Optim.AbstractOptimizer: Optimizer to be used for constructing trajectory.   Defaults to Optim.LBFGS(; m=5, linesearch=LineSearches.MoreThuente()).\nhistory_length::Int=5: Size of the history used to approximate the inverse Hessian.   This should only be set when optimizer is not an Optim.LBFGS.\nndraws_elbo::Int=5: Number of draws used to estimate the ELBO\nkwargs... : Remaining keywords are forwarded to Optim.Options.\n\nReturns\n\ndist::Distributions.MvNormal: ELBO-maximizing multivariate normal distribution\nϕ::Vector{<:AbstractVector{<:Real}}: ndraws draws from multivariate normal\nlogqϕ::Vector{<:Real}: log-density of multivariate normal at ϕ values\n\n\n\n\n\n","category":"method"}]
}
