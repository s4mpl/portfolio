import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export const getProjects = () => {
  const files = fs.readdirSync(path.join('assets', 'projects'));

  return files.map(fileName => {
    const data = fs.readFileSync(path.join('assets', 'projects', fileName)).toString();
    const markdown = matter(data);
    const contents = marked.parse(markdown.content);
    return {
      fileName: fileName,
      slug: fileName.replace('.md', ''),
      data: markdown.data,
      contents
    };
  });
};

export const getPosts = () => {
  const files = fs.readdirSync(path.join('assets', 'posts'));

  return files.map(fileName => {
    const data = fs.readFileSync(path.join('assets', 'posts', fileName)).toString();
    const markdown = matter(data);
    const contents = marked.parse(markdown.content);
    return {
      fileName: fileName,
      slug: fileName.replace('.md', ''),
      data: markdown.data,
      contents
    };
  });
};
 
export const getProjectFromSlug = (slug) => {
  return getProjects().find(project => {
    return project.slug == slug;
  });
};

export const getPostFromSlug = (slug) => {
  return getPosts().find(post => {
    return post.slug == slug;
  });
};