namespace Api.Models;
// mapping to ints to make storing db agnostic
public enum Relationship
{
    None = 0, 
    Spouse = 1,
    DomesticPartner = 2,
    Child = 3
}
