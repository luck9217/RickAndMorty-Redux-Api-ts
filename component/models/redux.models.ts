export interface CharacterModel{
    "id":number,
    "image":string,
    "name":string,
    "species":string
}
export interface CharacterArrayModel{
    all_characters:CharacterModel[]

}