#!/bin/bash

# archive.sh
# Archives the most recent report with a unique timestamp name under the /reports/archive folder
# Arg1: report directory, which should contain a cucumber/ and archive/ folder beneath it

reports_dir="$1"

# check if arg exists
if [ -z "$reports_dir" ]; then
  echo "Reports directory must be defined as first arg"
  exit 1
fi

src_path="$reports_dir/cucumber"

if [ ! -d "$src_path" ]; then
  echo "JSON source directory ($src_path) does not exist. Exiting..."
  exit 0
fi

# the index.html that represents the report generated
web_report_path=$src_path/index.html
web_assets_path=$src_path/assets
web_features_path=$src_path/features

if [[ ! -f "$web_report_path" ]]; then
  echo -e "\n Can't find index.html file, nothing to archive! Exiting... \n"
  exit 0
fi

files=("$web_report_path" "$web_assets_path" "$web_features_path")
archive_path="$reports_dir/archive"

# create the archive dir, named by time
time=$(date +%s)
new_report_dir="$archive_path/report_${time}"
mkdir -p "$new_report_dir"

# move each file over to the archive with a timestamp added
for file in "${files[@]}"; do
  # need to check if file exists since the files array could 
  # just include the glob pattern if nothing is found
  if [[ -f "$file" || -d "$file" ]]; then 
    mv "$file" "$new_report_dir"
  fi
done


echo -e "\n =================== ARCHIVE CREATED =================== \n"
