<?php

$data = $_REQUEST;

function e($v) {
  return htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
}

function render_value($val) {
  if (is_array($val)) {
    if (count($val) === 0) return '<span class="empty">(empty array)</span>';
    $out = "<ul>";
    foreach ($val as $v) {
      $out .= "<li>" . render_value($v) . "</li>";
    }
    $out .= "</ul>";
    return $out;
  }
  $trim = trim((string)$val);
  return $trim === '' ? '<span class="empty">(empty)</span>' : e($trim);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Submission Received</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="css/main.css" />
</head>
<body>
  <div class="container">
    <h1>Submission Received</h1>
    <p class="sub"><?php echo e($_SERVER['REQUEST_METHOD']); ?> • <?php echo count($data); ?> keys captured</p>

    <div class="card-table">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <?php if (empty($data)): ?>
            <tr>
              <td colspan="2" class="empty">No data submitted.</td>
            </tr>
          <?php else: ?>
            <?php foreach ($data as $key => $value): ?>
              <tr>
                <th><?php echo e($key); ?></th>
                <td><?php echo render_value($value); ?></td>
              </tr>
            <?php endforeach; ?>
          <?php endif; ?>
        </tbody>
      </table>
    </div>

    <a href="form.html" class="back-link">← Back to form</a>
  </div>
</body>
</html>
