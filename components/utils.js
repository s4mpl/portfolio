import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getProjects = () => {
  const files = fs.readdirSync(path.join('assets', 'projects'));

  return files.map(fileName => {
    const data = fs.readFileSync(path.join('assets', 'projects', fileName)).toString();
    const markdown = matter(data);
    return {
      fileName: fileName,
      slug: fileName.replace('.md', ''),
      data: markdown.data,
      contents: markdown.content
    };
  });
};
 
export const getProjectFromSlug = (slug) => {
  return getProjects().find(project => {
    return project.slug == slug;
  });
};

export const markdown = (data) => {
  return data;
};
