<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = Finder::create()
    ->in(__DIR__ . '/app')
    ->name('*.php');

return (new Config())
    ->setRules([
        '@PSR12' => true, // Enable PSR-12 standard (PSR-4 is part of PSR-12)
        'array_syntax' => ['syntax' => 'short'], // Use short array syntax []
        'no_unused_imports' => false, // Remove unused imports
        'ordered_imports' => true, // Order imports alphabetically
        'trailing_comma_in_multiline' => true, // Add trailing commas in multi-line arrays and function arguments
        'no_trailing_whitespace' => true, // Remove trailing whitespace
        'no_empty_statement' => true, // No empty statements
    ])
    ->setFinder($finder);
