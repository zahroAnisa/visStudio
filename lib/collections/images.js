
import { FilesCollection } from 'meteor/ostrio:files';

Images = new FilesCollection({
  debug: true,
  collectionName: 'Images'
});