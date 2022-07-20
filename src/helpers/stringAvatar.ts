export default function stringAvatar(name: string) {
  if (name.split(' ').length > 1) {
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
  }
  return `${name.split(' ')[0][0]}`;
}
