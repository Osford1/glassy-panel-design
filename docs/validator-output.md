# Validator output

Verbatim stdout of `tools/theme-contrast-check.mjs` on the two committed
palettes. Both runs were made from the repo root with Node v24.14.1; both exited
0. This is the source for the README's "Measured contrast" table and its
"Expected output" block. The validator's `PAIRS` array is authoritative for the
contract: 16 pairs per appearance, 12 of which the spec tables.

## Glacier

Command:

    node tools/theme-contrast-check.mjs palettes/glacier.json

Output:

```text

=== contrast · light (colors) ===
ok   ink on canvas                14.25:1  (min 4.5)
ok   ink on paper                 15.74:1  (min 4.5)
ok   ink on input                 15.74:1  (min 4.5)
ok   muted on canvas               6.50:1  (min 4.5)
ok   muted on paper                7.17:1  (min 4.5)
ok   onPrimary on primary          6.37:1  (min 4.5)
ok   onAccent on accent            6.37:1  (min 4.5)
ok   onDanger on danger            6.54:1  (min 4.5)
ok   shellForeground on primaryDeep   12.91:1  (min 4.5)
ok   line on canvas                3.61:1  (min 3)
ok   line on paper                 3.99:1  (min 3)
ok   danger on canvas              5.80:1  (min 4.5)
ok   danger on paper               6.41:1  (min 4.5)
ok   accent on canvas              5.66:1  (min 4.5)
ok   accent on paper               6.24:1  (min 4.5)
ok   primary on paper              6.24:1  (min 4.5)

=== contrast · dark (darkColors) ===
ok   ink on canvas                16.22:1  (min 4.5)
ok   ink on paper                 14.47:1  (min 4.5)
ok   ink on input                 13.48:1  (min 4.5)
ok   muted on canvas               8.53:1  (min 4.5)
ok   muted on paper                7.61:1  (min 4.5)
ok   onPrimary on primary          8.85:1  (min 4.5)
ok   onAccent on accent            8.85:1  (min 4.5)
ok   onDanger on danger            6.60:1  (min 4.5)
ok   shellForeground on primaryDeep   17.15:1  (min 4.5)
ok   line on canvas                4.12:1  (min 3)
ok   line on paper                 3.68:1  (min 3)
ok   danger on canvas              6.70:1  (min 4.5)
ok   danger on paper               5.98:1  (min 4.5)
ok   accent on canvas              9.09:1  (min 4.5)
ok   accent on paper               8.11:1  (min 4.5)
ok   primary on paper              8.11:1  (min 4.5)

=== lightness ladder · light (colors) ===
  role            hex        L*     h    s%    l%
  canvas          #eef2f4   95.3  200    21    95
  paper           #fbfdfe   99.2  200    60    99
  ink             #16232a   12.9  201    31    13
  muted           #48595f   36.6  196    14    33
  primary         #116974   40.4  187    74    26
  primaryDeep     #dfe8ec   91.4  198    25    90
  onPrimary       #ffffff  100.0    0     0   100
  accent          #116974   40.4  187    74    26
  onAccent        #ffffff  100.0    0     0   100
  line            #6d818a   52.7  199    12    48
  input           #fbfdfe   99.2  200    60    99
  danger          #b3261e   39.7    3    71    41
  onDanger        #ffffff  100.0    0     0   100
  shellForeground #16232a   12.9  201    31    13
  -> surface step (paper - canvas) = 3.9 L*  (design range: 4-8)

=== lightness ladder · dark (darkColors) ===
  role            hex        L*     h    s%    l%
  canvas          #0d1417    5.9  198    28     7
  paper           #162024   11.5  197    24    11
  ink             #e8f1f4   94.6  195    35    93
  muted           #9fb3bb   71.7  197    17    68
  primary         #45c8bf   73.8  176    54    53
  primaryDeep     #070c0e    3.1  197    33     4
  onPrimary       #05191a    7.2  183    68     6
  accent          #45c8bf   73.8  176    54    53
  onAccent        #05191a    7.2  183    68     6
  line            #647a84   49.9  199    14    45
  input           #1b262b   14.4  199    23    14
  danger          #ff6b6b   64.0    0   100    71
  onDanger        #2a0a0a    6.6    0    62    10
  shellForeground #e8f1f4   94.6  195    35    93
  -> surface step (paper - canvas) = 5.6 L*  (design range: 4-8)

=== schema ===
  ok   all required roles present, exact lowercase #rrggbb, schemaVersion 1

RESULT: PASS — every contract pair within minimum
```

## Sunstone

Command:

    node tools/theme-contrast-check.mjs palettes/sunstone.json

Output:

```text

=== contrast · light (colors) ===
ok   ink on canvas                12.74:1  (min 4.5)
ok   ink on paper                 15.53:1  (min 4.5)
ok   ink on input                 15.53:1  (min 4.5)
ok   muted on canvas               5.57:1  (min 4.5)
ok   muted on paper                6.79:1  (min 4.5)
ok   onPrimary on primary          6.04:1  (min 4.5)
ok   onAccent on accent            6.04:1  (min 4.5)
ok   onDanger on danger            6.54:1  (min 4.5)
ok   shellForeground on primaryDeep   12.52:1  (min 4.5)
ok   line on canvas                3.37:1  (min 3)
ok   line on paper                 4.10:1  (min 3)
ok   danger on canvas              5.29:1  (min 4.5)
ok   danger on paper               6.44:1  (min 4.5)
ok   accent on canvas              4.88:1  (min 4.5)
ok   accent on paper               5.95:1  (min 4.5)
ok   primary on paper              5.95:1  (min 4.5)

=== contrast · dark (darkColors) ===
ok   ink on canvas                15.61:1  (min 4.5)
ok   ink on paper                 14.13:1  (min 4.5)
ok   ink on input                 13.02:1  (min 4.5)
ok   muted on canvas               7.77:1  (min 4.5)
ok   muted on paper                7.03:1  (min 4.5)
ok   onPrimary on primary          8.22:1  (min 4.5)
ok   onAccent on accent            8.22:1  (min 4.5)
ok   onDanger on danger            7.03:1  (min 4.5)
ok   shellForeground on primaryDeep   16.64:1  (min 4.5)
ok   line on canvas                3.94:1  (min 3)
ok   line on paper                 3.56:1  (min 3)
ok   danger on canvas              6.98:1  (min 4.5)
ok   danger on paper               6.31:1  (min 4.5)
ok   accent on canvas              8.26:1  (min 4.5)
ok   accent on paper               7.47:1  (min 4.5)
ok   primary on paper              7.47:1  (min 4.5)

=== lightness ladder · light (colors) ===
  role            hex        L*     h    s%    l%
  canvas          #efe6d8   91.6   37    42    89
  paper           #fffdfb   99.4   30   100    99
  ink             #2b2117   13.6   30    30    13
  muted           #65584a   38.3   31    15    34
  primary         #a04a08   41.8   26    90    33
  primaryDeep     #ede4d8   91.0   34    37    89
  onPrimary       #ffffff  100.0    0     0   100
  accent          #a04a08   41.8   26    90    33
  onAccent        #ffffff  100.0    0     0   100
  line            #8d7962   52.1   32    18    47
  input           #fffdfb   99.4   30   100    99
  danger          #b3261e   39.7    3    71    41
  onDanger        #ffffff  100.0    0     0   100
  shellForeground #2b2117   13.6   30    30    13
  -> surface step (paper - canvas) = 7.8 L*  (design range: 4-8)

=== lightness ladder · dark (darkColors) ===
  role            hex        L*     h    s%    l%
  canvas          #1b1714    8.1   26    15     9
  paper           #262019   12.7   32    21    12
  ink             #f6efe6   94.8   34    47    93
  muted           #bca894   70.1   30    23    66
  primary         #e8a33d   72.0   36    79    57
  primaryDeep     #12100e    4.8   30    13     6
  onPrimary       #241505    8.3   31    76     8
  accent          #e8a33d   72.0   36    79    57
  onAccent        #241505    8.3   31    76     8
  line            #87735e   49.8   31    18    45
  input           #2e2620   15.9   26    18    15
  danger          #ff7a66   66.6    8   100    70
  onDanger        #2a0f08    7.7   12    68    10
  shellForeground #f6efe6   94.8   34    47    93
  -> surface step (paper - canvas) = 4.6 L*  (design range: 4-8)

=== schema ===
  ok   all required roles present, exact lowercase #rrggbb, schemaVersion 1

RESULT: PASS — every contract pair within minimum
```
