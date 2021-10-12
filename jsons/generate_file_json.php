<?php
$generatedFileNameZip = 'anrits.zip';
$generatedFileName = 'Region_TwigTheme.json';
$regions = [];

$jsons = array_filter(scandir(__DIR__), function ($fileName) use ($generatedFileName) {
    return !in_array($fileName, ['.', '..', $generatedFileName]) && pathinfo(__DIR__ . $fileName, PATHINFO_EXTENSION) == "json";
});

$processFiles = function ($content) {
    $region = $content[0]['Region'];
    $blocks = $content[0]['Block'];
    $region = array_intersect_key($region, ['title' => true, 'alias' => true, 'block_count' => true]);
    $region['title'] = trim($region['title']);
    $region['alias'] = trim($region['alias']);
    $region['block_count'] = count($blocks);
    array_walk($blocks, function (&$block) {
        $block = array_intersect_key($block, ['title' => true, 'alias' => true, 'body' => true, 'status' => true, 'params' => true]);
        $block['title'] = trim($block['title']);
        $block['alias'] = trim($block['alias']);
        $block['status'] = true;
        $block['show_title'] = false;
        $block['visibility_roles'] = '';
        $block['visibility_paths'] = '';
        $block['params'] = $block['params'] ?: 'disabledCkEditor=1';
    });
    $content[0]['Region'] = $region;
    $content[0]['Block'] = $blocks;
    return $content;
};

foreach ($jsons as $fileName) {
    $content = file_get_contents(__DIR__ . DIRECTORY_SEPARATOR . $fileName);
    $content = json_decode($content, true);
    $content = $processFiles($content);
    file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . $fileName, json_encode($content, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    $regions[] = $content[0];
}
file_put_contents(__DIR__ . DIRECTORY_SEPARATOR . $generatedFileName, json_encode($regions, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

$r = exec('cd ..; cp jsons/Region_TwigTheme.json Region_TwigTheme.json');
echo $r . PHP_EOL;
$result = exec("cd ..; rm $generatedFileNameZip; zip $generatedFileNameZip -r css/ fonts/ images/ js/ sounds/ svg/ Region_TwigTheme.json");
echo $result . PHP_EOL;
$r = exec('cd ..; rm Region_TwigTheme.json');
echo $r . PHP_EOL;
